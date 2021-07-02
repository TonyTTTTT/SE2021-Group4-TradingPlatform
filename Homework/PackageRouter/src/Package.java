import java.nio.channels.Pipe;

public class Package {

    private Bin expectedDestination;

    private String id;

    private boolean misRouted;

    private Pipe pipe;

    private Bin actualDestination;

    public Package() {
    }

    public Package(String id) {
        this.id = id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setExpectedDestination(Bin expectedDestination) {
        this.expectedDestination = expectedDestination;
    }

    public Bin getExpectedDestination() {
        return expectedDestination;
    }

    public String getId() {
        return id;
    }
}
