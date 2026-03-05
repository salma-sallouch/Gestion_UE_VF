package metiers;

import entities.Module;
import entities.UniteEnseignement;

import java.util.ArrayList;
import java.util.List;

public class ModuleBusiness {

    private static List<Module> modules = new ArrayList<>();

    public boolean addModule(Module module) {

        if (getModuleByMatricule(module.getMatricule()) != null) {
            return false;
        }

        modules.add(module);
        return true;
    }

    public List<Module> getAllModules() {
        return modules;
    }

    public Module getModuleByMatricule(String matricule) {

        for (Module m : modules) {
            if (m.getMatricule().equals(matricule)) {
                return m;
            }
        }

        return null;
    }

    public boolean updateModule(String matricule, Module updated) {

        Module existing = getModuleByMatricule(matricule);

        if (existing == null) {
            return false;
        }

        existing.setNom(updated.getNom());
        existing.setCoefficient(updated.getCoefficient());
        existing.setVolumeHoraire(updated.getVolumeHoraire());
        existing.setType(updated.getType());
        existing.setUniteEnseignement(updated.getUniteEnseignement());

        return true;
    }

    public boolean deleteModule(String matricule) {

        Module module = getModuleByMatricule(matricule);

        if (module == null) {
            return false;
        }

        modules.remove(module);
        return true;
    }
}