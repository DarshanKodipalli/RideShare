// Class to represent a Driver

class Driver {
    private int id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private double rating;
    private String car;
    private String license;
    private String carImage;

    public Driver() {
        this.id = -1;
        this.username = "";
        this.password = "";
        this.email= "";
        this.phone= "";
        this.rating = 0.0;
        this.car= "";
        this.license= "";
        this.carImage = "";
    }

    public Driver(int id, String username, String email, String password, String phone, double rating, String car, String license, String carImage) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email= email;
        this.phone= phone;
        this.rating = rating;
        this.car= car;
        this.license= license;
        this.carImage = carImage;
    }

    public int getid() {
        return this.id;
    }

    public void setid(int id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public double getRating() {
        return this.rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getCar() {
        return this.car;
    }

    public void setCar(String car) {
        this.car = car;
    }

    public String getLicense() {
        return this.license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public String getCarImage() {
        return this.carImage;
    }

    public void setCarImage(String carImage) {
        this.carImage = carImage;
    }

}