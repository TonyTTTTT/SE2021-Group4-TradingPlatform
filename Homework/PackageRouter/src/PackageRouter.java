import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class PackageRouter {

    private SourceStation sourceStation;

    private BinaryTree switches;

    private List<Bin> bins = new ArrayList<>();

    public void setDelay(List<Package> packages) {
        sourceStation.arrivePackage(packages);
        sourceStation.calculateDelay();
    }

    public void setBins(List<Bin> bins) {
        this.bins = bins;
    }

    public List<Bin> getBins() {
        return bins;
    }

    public void setSourceStation(SourceStation sourceStation) {
        this.sourceStation = sourceStation;
    }

    private void setSwitch() {

    }

    public void signalWrongBin() {
        for(Bin bin: bins) {
            bin.checkPackages();
        }
    }

}
