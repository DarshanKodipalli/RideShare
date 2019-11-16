// Initialize app and create database schema
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet("/Startup")

public class Startup extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public void init() {
        try {
            new DatabaseAPI().createSchema();
        } catch (Exception e) {
            System.out.println();
            System.out.println(e.getMessage());
            e.printStackTrace();
            System.out.println();
            System.out.println("[rideshare][init] Application & Database Setup Failed");
        }
        System.out.println("[rideshare][init] Application & Database Setup Complete");
    }
}