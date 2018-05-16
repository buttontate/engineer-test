package pizza;

public class Time {
    private String currentTimestamp;

    public Time(String currentTimestamp) {
        this.currentTimestamp = currentTimestamp;
    }

    public String getCurrentTimestamp() {
        return currentTimestamp;
    }

    public void setCurrentTimestamp(String currentTimestamp) {
        this.currentTimestamp = currentTimestamp;
    }
}
