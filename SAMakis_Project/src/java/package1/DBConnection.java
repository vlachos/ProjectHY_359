package package1;


import static java.lang.System.out;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author spiro_000
 */
public class DBConnection {
    private static final String url = "jdbc:derby://localhost";
    private static final String databaseName = "SAMakisDB";
    private static final int port = 1527;
    private static final String username = "";
    private static final String password = "";
    
    public static Connection getConnection() throws SQLException, ClassNotFoundException{
        Class.forName("org.apache.derby.jdbc.ClientDriver");
        return DriverManager.getConnection(url + ":" + port + "/" + databaseName);
    }
}
