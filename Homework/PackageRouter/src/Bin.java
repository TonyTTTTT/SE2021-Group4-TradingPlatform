import java.util.ArrayList;
import java.util.List;

public class Bin {

    private List<Package> packages = new ArrayList<>();

    private String id;

    public void add(Package p) {
        packages.add(p);
    }

    public Bin(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void checkPackages() {
        for (Package p: packages) {
            if (!p.getExpectedDestination().getId().equals(id)) {
                System.out.println(p.getId() + " " + getId());
            }
        }
    }
}
