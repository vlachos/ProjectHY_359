package package1;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
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
public class Shop {
    static final String JDBC_DRIVER = "org.apache.derby.jdbc.ClientDriver";
    static final String DB_URL = "jdbc:derby://localhost:1527/SAMakisDB";
    private String name;
    
    public Shop(String name){
        this.name=name;
    }
    
    public void addShopInDB() throws SQLException, ClassNotFoundException{
        Connection con = null;
        Statement stmt = null;
        
        try{
            Class.forName("org.apache.derby.jdbc.ClientDriver");
            con = DriverManager.getConnection(DB_URL, "", "");
            stmt = con.createStatement();
            
            String sql = "INSERT INTO SHOPS "+"VALUES ('makis',135,135,'sfsdf','asdasd',23)";
            stmt.executeUpdate(sql);
        }catch(SQLException se){
            //Handle errors for JDBC
            se.printStackTrace();
        }catch(Exception e){
           //Handle errors for Class.forName
           e.printStackTrace();
        }finally{
           //finally block used to close resources
           try{
              if(stmt!=null)
                 con.close();
           }catch(SQLException se){
           }// do nothing
           try{
              if(con!=null)
                 con.close();
           }catch(SQLException se){
              se.printStackTrace();
      }//end finally try
   }//end try
    }
}
