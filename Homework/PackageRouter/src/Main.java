import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class Main {

    public static void main(String[] args) throws IOException {
        File inputFile = new File(args[0]);
        BufferedReader reader = new BufferedReader(new FileReader(inputFile));
        String line = reader.readLine();
        switch (line) {
            case "SCENARIO1": processScenario1(reader); break;
            case "SCENARIO2": processScenario2(reader); break;
            case "SCENARIO3": processScenario3(reader); break;
            default: break;
        }
    }

    private static void processScenario1(BufferedReader reader) throws IOException {
        int delayTime = Integer.parseInt(reader.readLine());
        int binNum = Integer.parseInt(reader.readLine());
        int packageNum = Integer.parseInt(reader.readLine());
        PackageRouter packageRouter = new PackageRouter();
        SourceStation sourceStation = new SourceStation(packageRouter, delayTime);
        packageRouter.setSourceStation(sourceStation);
        List<Package> packages = new ArrayList<>();
        List<Bin> bins = new ArrayList<>();
        for (int i = 0; i < binNum; i++) {
            Bin bin = new Bin("bin" + i);
            bins.add(bin);
        }
        String line = null;
        for (int i = 0; i < packageNum; i++) {
            Package aPackage = new Package();
            packages.add(aPackage);
            line = reader.readLine();
            String[] split = line.split(" ");
            String packageId = split[0];
            aPackage.setId(packageId);
            int binId = Integer.parseInt(split[1].substring("bin".length()));
            if (binId >= bins.size()) {
                packages.get(i).setExpectedDestination(new Bin(split[1]));
            } else {
                packages.get(i).setExpectedDestination(bins.get(binId));
            }
        }
        packageRouter.setDelay(packages);
    }

    private static void processScenario2(BufferedReader reader) {
    }

    private static void processScenario3(BufferedReader reader) throws IOException {
        int packageNum = Integer.parseInt(reader.readLine());
        List<Package> packages = new ArrayList<>();
        List<Bin> bins = new ArrayList<>();
        int[] expectedBinId = new int[packageNum];
        Set<Integer> binIds = new HashSet<>();
        Map<String, Bin> binMap = new HashMap<>();
        Map<String, Integer> packageMap = new HashMap<>();
        String line;
        for (int i = 0; i < packageNum; i++) {
            line = reader.readLine();
            String[] splits = line.split(" ");
            Package aPackage = new Package(splits[0]);
            packageMap.put(splits[0], i);
            packages.add(aPackage);
            int binId = Integer.parseInt(splits[1].substring("bin".length()));
            expectedBinId[i] = binId;
            binIds.add(binId);
        }
        for (int binId: binIds) {
            Bin bin = new Bin("bin" + binId);
            bins.add(bin);
            binMap.put("bin" + binId, bin);
        }
        for (int i = 0; i < packageNum; i++) {
            packages.get(i).setExpectedDestination(binMap.get("bin" + expectedBinId[i]));
        }
        while ((line = reader.readLine()) != null) {
            String[] split = line.split(" ");
            int binId = Integer.parseInt(split[0].substring("bin".length()));
            if (!binMap.containsKey("bin" + binId)) {
                Bin bin = new Bin("bin" + binId);
                binMap.put("bin" + binId, bin);
                bins.add(bin);
            }
            for (int i = 1; i < split.length; i++) {
                int packageId = packageMap.get(split[i]);
                Package p = packages.get(packageId);
                binMap.get("bin" + binId).add(p);
            }
        }
        PackageRouter packageRouter = new PackageRouter();
        packageRouter.setBins(bins);
        packageRouter.signalWrongBin();
    }
}
