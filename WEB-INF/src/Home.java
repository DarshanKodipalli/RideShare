// Handle Homepage
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Home")

public class Home extends HttpServlet {
    private static final long serialVersionUID = 3L;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html");
        response.setStatus(200);
        PrintWriter printWriter = response.getWriter();
        Utility util = new Utility(request, printWriter);
        util.printHtml("index.html");
    }
}