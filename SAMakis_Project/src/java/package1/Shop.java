package package1;


import java.sql.Connection;
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
    private String name;
    
    public Shop(String name){
        this.name=name;
    }
    
    public void addShopInDB() throws SQLException, ClassNotFoundException{
        try{
            Connection con = DBConnection.getConnection();
            Statement stmt = con.createStatement();
            
            String q = "INSERT INTO "+"APP.SHOPS (NAME)"+"VALUES ("+"'"+name+"')";
            stmt.executeUpdate(q);
            System.out.println("DONE!!!");
        }
        catch(SQLException e){
            System.out.println("error");
        }
    }
}
