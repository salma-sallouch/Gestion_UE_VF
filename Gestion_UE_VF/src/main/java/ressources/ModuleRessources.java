package ressources;

import entities.Module;
import metiers.ModuleBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("modules")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ModuleRessources {

    public static ModuleBusiness metier = new ModuleBusiness();

    @POST
    public Response add(Module module) {

        if (metier.addModule(module)) {
            return Response.status(201).build();
        }

        return Response.status(400).build();
    }

    @GET
    public Response list() {

        List<Module> modules = metier.getAllModules();

        if (modules.isEmpty()) {
            return Response.status(204).build();
        }

        return Response.ok(modules).build();
    }

    @GET
    @Path("/{matricule}")
    public Response get(@PathParam("matricule") String matricule) {

        Module module = metier.getModuleByMatricule(matricule);

        if (module == null) {
            return Response.status(404).build();
        }

        return Response.ok(module).build();
    }

    @PUT
    @Path("/{matricule}")
    public Response update(@PathParam("matricule") String matricule,
                           Module module) {

        if (metier.updateModule(matricule, module)) {
            return Response.ok().build();
        }

        return Response.status(404).build();
    }

    @DELETE
    @Path("/{matricule}")
    public Response delete(@PathParam("matricule") String matricule) {

        if (metier.deleteModule(matricule)) {
            return Response.ok().build();
        }

        return Response.status(404).build();
    }
}