import java.util.List;
import java.util.ArrayList;

public class SourceStation {

    private int delayTime;

    private List<Package> packages = new ArrayList<Package>();

    private PackageRouter packageRouter;

    public SourceStation(PackageRouter pr, int delay_time) {
        packageRouter = pr;
        delayTime = delay_time;
    }

    public void setDelayTime(int delayTime) {
        this.delayTime = delayTime;
    }

    public void arrivePackage(List<Package> packages) {
        this.packages = packages;
    }

    private boolean checkPackage(Package p) {
        String binId = p.getExpectedDestination().getId();
        for (Bin bin : packageRouter.getBins()) {
            if (binId.equals(bin.getId())) {
                return true;
            }
        }
        return false;
    }

    public void calculateDelay() {
        int time = 0;
        int prevPackageId = 0;
        if (packages.size() == 0) {
            return;
        }
        if (packages.size() == 1) {
            System.out.println(0);
            System.out.println(packages.get(0).getId());
            return;
        }
        System.out.println(0);
        System.out.print(packages.get(0).getId() + " ");
        Package prevPackage = packages.get(0);
        for (int i = 1; i < packages.size(); i++) {
            Package curPackage = packages.get(i);
            prevPackage = packages.get(i - 1);
            if (prevPackage.getExpectedDestination().getId().equals(curPackage.getExpectedDestination().getId())) {
                System.out.print(curPackage.getId() + " ");
            } else {
                System.out.println();
                time += delayTime;
                System.out.println(time);
                System.out.print(curPackage.getId() + " ");
            }
        }

    }

}
