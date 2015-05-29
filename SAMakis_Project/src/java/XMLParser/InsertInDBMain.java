/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package XMLParser;

import DB.DBOperations;
import DB.Shop;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author spiro_000
 */
public class InsertInDBMain {
    public static void main(String[] args) throws SQLException{
        DBOperations oper = new DBOperations();
        oper.InitShopsfromXML();
        //SAXHandler h = new SAXHandler();
        //ArrayList<Shop> shops = h.GetShopsInArrayListFromXML();
        //shops = oper.MakeShopsUnicByCoords(shops);
        //System.out.println(shops);
        //System.out.println(shops);
        
        
    }
}
