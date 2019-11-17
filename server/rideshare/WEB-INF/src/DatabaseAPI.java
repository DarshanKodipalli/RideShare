// API to connect to database
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.PreparedStatement;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.HashMap;
import java.sql.SQLException;


public class DatabaseAPI {
    private static Connection connection = null;
    private String host;
    private int port;
    private String database;
    private String username;
    private String password;
    private String dbURI;

    public DatabaseAPI() {
        this.host = "127.0.0.1";
        this.port = 3306;
        this.username = "rideshareAdmin";
        this.password = "qwerty@123";
        this.database = "rideshare";
        this.dbURI = "jdbc:mysql://" + this.host + ":" + this.port + "/" + this.database;
    }

    public DatabaseAPI(String host, int port, String username, String password, String database) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.database = database;
        this.dbURI = "jdbc:mysql://" + this.host + ":" + this.port + "/" + this.database;
    }

    private void connectDatabase() throws SQLException {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception e) {
            e.printStackTrace();
            throw new SQLException("Unable to instantiate JDBC Driver");
        }

        connection = DriverManager.getConnection(dbURI, username, password);
    }

    private void housekeeping() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                connection = null;
            }
        } catch (SQLException e) {
            System.out.println("[WARNING] " + e.getMessage());
        }
    }

    public Connection getConnection() throws SQLException {
        connectDatabase();
        return connection;
    }

    public void createSchema() throws SQLException {
        try {
            connectDatabase();

            Statement stmt = connection.createStatement();

            stmt.execute(
                "CREATE TABLE IF NOT EXISTS users(\n" +
                "    id INT PRIMARY KEY AUTO_INCREMENT,\n" +
                "    username VARCHAR(32) UNIQUE NOT NULL,\n" +
                "    email VARCHAR(64) UNIQUE NOT NULL,\n" +
                "    `password` VARCHAR(256) NOT NULL,\n" +
                "    credit_card VARCHAR(16) NOT NULL,\n" +
                "    phone VARCHAR(16),\n" +
                "    rating DOUBLE NOT NULL DEFAULT 0.0,\n" +
                "    superuser TINYINT NOT NULL DEFAULT 0\n" +
                ");"
            );

            stmt.execute(
                "CREATE TABLE IF NOT EXISTS drivers(\n" +
                "    id INT PRIMARY KEY AUTO_INCREMENT,\n" +
                "    username VARCHAR(32) UNIQUE NOT NULL,\n" +
                "    email VARCHAR(64) UNIQUE NOT NULL,\n" +
                "    `password` VARCHAR(256) NOT NULL,\n" +
                "    phone VARCHAR(16),\n" +
                "    rating DOUBLE NOT NULL DEFAULT 0.0,\n" +
                "    car VARCHAR(256) NOT NULL,\n" +
                "    license VARCHAR(16)\n" +
                ");"
            );

            stmt.execute(
                "CREATE TABLE IF NOT EXISTS rides(\n" +
                "    id INT PRIMARY KEY AUTO_INCREMENT,\n" +
                "    customer VARCHAR(32) NOT NULL,\n" +
                "    driver VARCHAR(32) NOT NULL,\n" +
                "    ride_type VARCHAR(32) NOT NULL,\n" +
                "    `source` VARCHAR(256) NOT NULL,\n" +
                "    destination VARCHAR(256) NOT NULL,\n" +
                "    `status` VARCHAR(32) NOT NULL,\n" +
                "    booked_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n" +
                "    duration DOUBLE NOT NULL DEFAULT 0.0,\n" +
                "    cancelled_on DATETIME DEFAULT NULL,\n" +
                "    cancelled_by VARCHAR(8) DEFAULT NULL," +
                "    cancel_reason VARCHAR(64) DEFAULT NULL,\n" +
                "    `distance` DOUBLE,\n" +
                "    price DOUBLE,\n" +
                "    zipcode VARCHAR(8),\n" +
                "    FOREIGN KEY(customer) REFERENCES USERS(username) ON UPDATE CASCADE ON DELETE CASCADE,\n" +
                "    FOREIGN KEY(driver) REFERENCES DRIVERS(username) ON UPDATE CASCADE ON DELETE CASCADE\n" +
                ");"
            );

            stmt.close();
        } finally {
            housekeeping();
        }
    }

    public HashMap<String, User> getUsers() throws SQLException {
        HashMap<String, User> users = new HashMap<>();
        try {
            connectDatabase();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users;");
            while (rs.next()) {
                String username = rs.getString("username");
                users.put(username, new User(
                    rs.getInt("id"),
                    username,
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("credit_card"),
                    rs.getString("phone"),
                    rs.getDouble("rating"),
                    rs.getBoolean("superuser")
                ));
            }
            rs.close();
            stmt.close();
        } finally {
            housekeeping();
        }
        return users;
    }

    public User getUser(String username) throws SQLException {
        try {
            connectDatabase();
            PreparedStatement pst = connection.prepareStatement("SELECT * FROM users WHERE username=?;");
            pst.setString(1, username);
            ResultSet rs = pst.executeQuery();
            while (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("credit_card"),
                    rs.getString("phone"),
                    rs.getDouble("rating"),
                    rs.getBoolean("superuser")
                );
            }
            rs.close();
            pst.close();
        } finally {
            housekeeping();
        }
        return null;
    }

    public User getUserAdmin(String username) throws SQLException {
        try {
            connectDatabase();
            PreparedStatement pst = connection.prepareStatement(
                "SELECT * FROM users WHERE username=? AND superuser=1;"
            );
            pst.setString(1, username);
            ResultSet rs = pst.executeQuery();
            while (rs.next()) {
                return new User(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("credit_card"),
                    rs.getString("phone"),
                    rs.getDouble("rating"),
                    rs.getBoolean("superuser")
                );
            }
            rs.close();
            pst.close();
        } finally {
            housekeeping();
        }
        return null;
    }

    public HashMap<String, Driver> getDrivers() throws SQLException {
        HashMap<String, Driver> drivers = new HashMap<>();
        try {
            connectDatabase();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM drivers;");
            while (rs.next()) {
                String username = rs.getString("username");
                drivers.put(username, new Driver(
                    rs.getInt("id"),
                    username,
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("phone"),
                    rs.getDouble("rating"),
                    rs.getString("car"),
                    rs.getString("license")
                ));
            }
            rs.close();
            stmt.close();
        } finally {
            housekeeping();
        }
        return drivers;
    }

    public Driver getDriver(String username) throws SQLException {
        try {
            connectDatabase();
            PreparedStatement pst = connection.prepareStatement("SELECT * FROM users WHERE username=?;");
            pst.setString(1, username);
            ResultSet rs = pst.executeQuery();
            while (rs.next()) {
                return new Driver(
                    rs.getInt("id"),
                    rs.getString("username"),
                    rs.getString("email"),
                    rs.getString("password"),
                    rs.getString("phone"),
                    rs.getDouble("rating"),
                    rs.getString("car"),
                    rs.getString("license")
                );
            }
        } finally {
            housekeeping();
        }
        return null;
    }

    public void insertUser(String username, String email, String password, String creditCard, String phone, boolean superuser) throws SQLException {
        try {
            connectDatabase();
            PreparedStatement pst = connection.prepareStatement(
                "INSERT INTO users(username, email, password, credit_card, phone, superuser) VALUES(?, ?, ?, ?, ?, ?);"
            );
            pst.setString(1, username);
            pst.setString(2, email);
            pst.setString(3, password);
            pst.setString(4, creditCard);
            pst.setString(5, phone);
            pst.setBoolean(6, superuser);

            int res = pst.executeUpdate();
            if (res != 1) {
                throw new SQLException("Failed to insert Admin");
            }
        } finally {
            housekeeping();
        }
    }

    public void insertDriver(String username, String email, String password, String phone, String car, String license) throws SQLException {
        try {
            connectDatabase();
            PreparedStatement pst = connection.prepareStatement(
                "INSERT INTO drivers(username, email, password, phone, car, license) VALUES(?, ?, ?, ?, ?, ?);"
            );
            pst.setString(1, username);
            pst.setString(2, email);
            pst.setString(3, password);
            pst.setString(4, phone);
            pst.setString(5, car);
            pst.setString(6, license);

            int res = pst.executeUpdate();
            if (res != 1) {
                throw new SQLException("Failed to insert Driver");
            }
            pst.close();
        } finally {
            housekeeping();
        }
    }
}