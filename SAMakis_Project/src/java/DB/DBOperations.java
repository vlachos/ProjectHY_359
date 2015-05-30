package DB;

import XMLParser.SAXHandler;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Map;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author spiro_000
 */
public class DBOperations {
   // JDBC driver name and database URL
   private static final String JDBC_DRIVER = "org.apache.derby.jdbc.ClientDriver";  
   private static final String DB_URL = "jdbc:derby://localhost:1527/SAMakisDB";
   private Connection conn = null;
   private Statement stmt = null;
   
   public static JSONArray convertToJSON(ResultSet resultSet)
            throws Exception {
       
        JSONArray jsonArray = new JSONArray();
        while (resultSet.next()) {
            int total_rows = resultSet.getMetaData().getColumnCount();
            JSONObject obj = new JSONObject();
            for (int i = 0; i < total_rows; i++) {
                obj.put(resultSet.getMetaData().getColumnLabel(i + 1)
                        .toLowerCase(), resultSet.getObject(i + 1));
            }
            jsonArray.put(obj);
        }
        return jsonArray;
    }
   
   /*DB general methods*/
   private void ConnectToDB(){
       try {
           Class.forName(JDBC_DRIVER);
       } catch (ClassNotFoundException ex) {
           Logger.getLogger(DBOperations.class.getName()).log(Level.SEVERE, null, ex);
       }
       try {
           System.out.println("Connecting to a selected database...");
           conn = DriverManager.getConnection(DB_URL);
           System.out.println("Connected database successfully...");
       } catch (SQLException ex) {
           Logger.getLogger(DBOperations.class.getName()).log(Level.SEVERE, null, ex);
       }
   }
   
   private void DisconnectFromDB(){
        if(stmt!=null)
                try {
                    stmt.close();
        } catch (SQLException ex) {
            Logger.getLogger(DBOperations.class.getName()).log(Level.SEVERE, null, ex);
        }
        if(conn!=null)
                try {
                    conn.close();
        } catch (SQLException ex) {
            Logger.getLogger(DBOperations.class.getName()).log(Level.SEVERE, null, ex);
        }

   }
   
   
   /*DB Shops methods*/
   public  ArrayList<Shop> MakeShopsUnicByCoords(ArrayList<Shop> shops){
       int counter = 0;
       for(int i=0; i<shops.size(); i++){
           for(int j=i+1; j<shops.size(); j++){
               if(shops.get(i).getLat().equals(shops.get(j).getLat()) && 
                  shops.get(i).getLng().equals(shops.get(j).getLng()) &&
                  shops.get(i).getName().equals(shops.get(j).getName())){
                  counter++;
                  //System.out.println(counter+") "+shops.get(i).getName()+" = "+shops.get(j).getName());
                  shops.remove(j);
               }
           }
       }
       return shops;
   }
   

   public void InitShopsfromXML() throws SQLException{

        SAXHandler hand = new SAXHandler();
        ArrayList<Shop> shops;
        String sql = null;
        int categ_id = 0;
        int shops_id = 0;
        
        shops = MakeShopsUnicByCoords(hand.GetShopsInArrayListFromXML());
        
        ConnectToDB();
        stmt = conn.createStatement();
        for(int i=0; i<shops.size(); ++i){
            sql = "insert into APP.SHOPS " +
                     "values (" + 
                     shops_id + "," +
                     "'" + shops.get(i).getName() + "'," +
                     Double.parseDouble(shops.get(i).getLng()) + "," +
                     Double.parseDouble(shops.get(i).getLat()) + "," +
                     "'" + shops.get(i).getAddress() + "'," + 0 + ")";


                   stmt.executeUpdate(sql);
                   //System.out.println("SHOP_ID: " + i);
            for(int j=0; j<shops.get(i).getCategory().size(); ++j){
                sql = "insert into APP.CATEGORIES " +
                     "values (" + 
                     categ_id + "," +
                     shops_id + "," +
                     "'" + shops.get(i).getCategory().get(j) + "')";


                   stmt.executeUpdate(sql);
                   //System.out.println("CAT_ID: " + categ_id);
                   categ_id++;
                
            }
            shops_id++;
        }
        DisconnectFromDB();
        //hand.printShopsFromXML();

   }
   
   public boolean ShopExists(String name, double lat, double lng) throws SQLException{
       boolean exists;
       
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "select from APP.SHOPS where name='"+name+"' and lat="+lat+"lng="+lng;      
       
       ResultSet rs = stmt.executeQuery(sql);
       exists = rs.next(); 
       System.out.println(exists);
       DisconnectFromDB();
       
       return exists;
   }
   
   public void InsertShopInDB(String name, double lat, double lng, String address, String category) throws SQLException{
       ConnectToDB();
       System.out.println("Inserting records into the table...");
       stmt = conn.createStatement();
       /*String sql = "insert into APP.SHOPS " +
       "values (" +
       shops_id + "," +
       "'" + name + "'," +
       lng + "," +
       lat + "," +
       "'" + address + "'," + 0 + ")";
       stmt.executeUpdate(sql);*/
       
       System.out.println("Inserted records into the table...");
       DisconnectFromDB();
   }
   
   public void DeleteShopFromDB(int id) throws SQLException{
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "delete from APP.SHOPS where id=" + id;
       stmt.executeUpdate(sql);
       System.out.println("Inserted user into the table...");
       
       DisconnectFromDB();
   }
   
   public JSONArray GetAllShops() throws SQLException, Exception{
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "select * FROM APP.SHOPS";
       
       
       ResultSet rs = stmt.executeQuery(sql);
       JSONArray shops = convertToJSON(rs);
       DisconnectFromDB();
       
       return shops;
   }
   
   public JSONArray GetShopsByCategory(String shopCategory) throws SQLException, Exception{
       
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "select SHOPS.id, name, category, lng, lat, address, views " +
             "from APP.SHOPS, APP.CATEGORIES" +
             " WHERE APP.CATEGORIES.CATEGORY='"+shopCategory+"'"+ "and" +
             " APP.SHOPS.ID = APP.CATEGORIES.ID_IN_SHOPS";
       
       
       ResultSet rs = stmt.executeQuery(sql);
       JSONArray shops = convertToJSON(rs);
       DisconnectFromDB();
       
       return shops;
   }
   
   /*DB Users methods*/
   
   public JSONArray GetAllUsers() throws SQLException, Exception{
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "select * FROM APP.USERS";
       
       
       ResultSet rs = stmt.executeQuery(sql);
       JSONArray users = convertToJSON(rs);
       DisconnectFromDB();
       
       return users;
   }
   
   public void InsertUserInDB(String username, String password, String email, boolean admin) throws SQLException{
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "insert into APP.USERS " +
                     "values ('" + 
                     username + "','" +
                     password + "','" +
                     email + "'," + admin +")";
       stmt.executeUpdate(sql);
       System.out.println("Inserted user into the table...");
       
       DisconnectFromDB();
       
   }
   
   public void DeleteUserFromDB(String username) throws SQLException{
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "delete from APP.USERS where username='"+username+"'";
       stmt.executeUpdate(sql);
       System.out.println("Inserted user into the table...");
       
       DisconnectFromDB();
   }
   
   public boolean UserExists(String username) throws SQLException{
       boolean exists;
       
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "select username from APP.USERS WHERE username='"+username+"'";       
       
       ResultSet rs = stmt.executeQuery(sql);
       exists = rs.next(); 
       System.out.println(exists);
       DisconnectFromDB();
       
       return exists;
   }
   
   public boolean checkLogin(String username, String password) throws SQLException{
       boolean exists;
       
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "select username, password from APP.USERS WHERE username='"+username+"'"+" and password='"+password+"'";       
       
       ResultSet rs = stmt.executeQuery(sql);
       exists = rs.next();
       System.out.println(exists);
       DisconnectFromDB();
       
       return exists;
   }
   
   public boolean isAdmin(String username, String password) throws SQLException{
       boolean isAdmin = false;
       
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "select admin from APP.USERS WHERE username='"+username+"'"+" and password='"+password+"'";       
       
       ResultSet rs = stmt.executeQuery(sql);
       while(rs.next()){
            isAdmin = rs.getBoolean("admin");
       }
       System.out.println(isAdmin);
       DisconnectFromDB();
       
       return isAdmin;
   }
   
   public JSONArray GetFavoriteShopsByUser(String username) throws SQLException, Exception{
       
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "";       
       
       ResultSet rs = stmt.executeQuery(sql);
       JSONArray shops = convertToJSON(rs);
       //System.out.println(rs.next());
       DisconnectFromDB();
       return shops;
   }
   
   public JSONArray GetShoppingListByUser(String username) throws SQLException, Exception{
       ConnectToDB();
       stmt = conn.createStatement();
       
       String sql = "";       
       
       ResultSet rs = stmt.executeQuery(sql);
       JSONArray shops = convertToJSON(rs);
       //System.out.println(rs.next());
       DisconnectFromDB();
       return shops;
   }
   
}
