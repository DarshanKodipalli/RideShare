import com.mysql.jdbc.exceptions.MySQLIntegrityConstraintViolationException;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

import java.nio.file.Paths;
import java.nio.file.Files;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@WebServlet("/Utility")

// Utility class with helper methods for the webapp
public class Utility extends HttpServlet {
    private static final long serialVersionUID = 2L;
    private static String TOMCAT_HOME = System.getProperty("catalina.home");
    private static String HOME_DIR = Paths.get(TOMCAT_HOME, "webapps", "rideshare").toString();

    private HttpServletRequest request;
    private PrintWriter printWriter;
    private String url;
    private HttpSession session;

    // Constructor
    public Utility(HttpServletRequest request, PrintWriter printWriter) {
        this.request = request;
        this.printWriter = printWriter;
        this.url = this.getFullURL();
        this.session = request.getSession(true);
    }

    // Prints the HTML in to HTTP Response
    public void printHtml(String file) {
        String htmlString = htmlToString(file);
        printWriter.println(htmlString);
    }

    // Reconstructs the URL from user request
    private String getFullURL() {
        String scheme = this.request.getScheme();
        String serverName = this.request.getServerName();
        int serverPort = this.request.getServerPort();
        String contextPath = this.request.getContextPath();

        StringBuffer url = new StringBuffer();
        url.append(scheme).append("://").append(serverName);

        if ((serverPort != 80) && (serverPort != 443)) {
            url.append(":").append(serverPort);
        }
        url.append(contextPath);
        url.append("/");

        return url.toString();
    }

    // Gets the HTML file and converts into String and returns the String
    private String htmlToString(String file) {
        String result = "";
        try {
            result = new String(Files.readAllBytes(Paths.get(HOME_DIR, file)));
        } catch (Exception e) {
            e.printStackTrace();
            result = "<h1>Internal Server Error</h1>";
        }
        return result;
    }

    // Clears session variables and logs out user
    public void logout() {
        this.session.removeAttribute("username");
        this.session.removeAttribute("usertype");
        this.session.removeAttribute("token");
    }

    // Checks if the user is logged in the current session
    public boolean isLoggedin() {
        return this.session.getAttribute("username") != null && this.session.getAttribute("token") != null;
    }

    // Returns the username from the session variable
    public String getSessionUsername() {
        if (this.session.getAttribute("username") != null)
            return this.session.getAttribute("username").toString();
        return null;
    }

    // Returns the usertype from the session variable
    public String getSessionUsertype() {
        if (this.session.getAttribute("usertype") != null)
            return this.session.getAttribute("usertype").toString();
        return null;
    }

    // Returns the token from the session variable
    public String getSessionToken() {
        if (this.session.getAttribute("token") != null)
            return this.session.getAttribute("token").toString();
        return null;
    }

    // Returns the user class variable
    public User getUser() throws SQLException {
        DatabaseAPI dbApi = new DatabaseAPI();
        return dbApi.getUser(this.getSessionUsername());
    }

    public static JsonObject getRequestJSON(HttpServletRequest request, Gson gson) throws IOException {
        StringBuffer jb = new StringBuffer();
        String line = null;
        BufferedReader reader = request.getReader();
        while ((line = reader.readLine()) != null)
            jb.append(line);
        return gson.fromJson(jb.toString(), JsonObject.class);
    }
}