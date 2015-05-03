package DB;

import Parser.SAXHandler;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
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
                    conn.close();
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

   public void InitShopsfromXML() throws SQLException{

        SAXHandler hand = new SAXHandler();
        ArrayList<Shop> shops = hand.GetShopsInArrayListFromXML();
        String sql = null;
        
        ConnectToDB();
        stmt = conn.createStatement();
        for(int i=0; i<shops.size(); ++i){
            sql = "INSERT INTO SHOPS " +
                 "VALUES (" + 
                 i + "," +
                 "'" + shops.get(i).getName() + "'," +
                 "'" + shops.get(i).getCategory() + "'," +
                 Double.parseDouble(shops.get(i).getLng()) + "," +
                 Double.parseDouble(shops.get(i).getLat()) + "," +
                 "'" + shops.get(i).getAddress() + "'," +
                 "'" + shops.get(i).getDetails() + "')";
            
            
               stmt.executeUpdate(sql);
               System.out.println("OK " + i);
        }
        DisconnectFromDB();
        //hand.printShopsFromXML();

   }
   
   public void InsertShopInDB(Shop shop) throws SQLException{
       ConnectToDB();
       System.out.println("Inserting records into the table...");
       stmt = conn.createStatement();
       String sql = "INSERT INTO SHOPS " +
                 "VALUES ('makis2', 135, 135, 'maria','sdhif',23)";
       stmt.executeUpdate(sql);
       
       System.out.println("Inserted records into the table...");
       DisconnectFromDB();
   }
   
   public void InsertUserInDB(){
   
   }
   
   
}
