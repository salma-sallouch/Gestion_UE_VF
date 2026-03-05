package ressources;

import entities.UniteEnseignement;
import metiers.UniteEnseignementBusiness;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("UE")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UERessources {

    public static UniteEnseignementBusiness metier =
            new UniteEnseignementBusiness();

    @POST
    public Response add(UniteEnseignement ue) {
        return metier.addUniteEnseignement(ue)
                ? Response.status(201).build()
                : Response.status(400).build();
    }

    @GET
    public List<UniteEnseignement> list() {
        return metier.getListeUE();
    }

    @GET
    @Path("/{code}")
    public Response get(@PathParam("code") int code) {
        UniteEnseignement ue = metier.getUEByCode(code);
        return (ue != null)
                ? Response.ok(ue).build()
                : Response.status(404).build();
    }

    @PUT
    @Path("/{code}")
    public Response update(@PathParam("code") int code,
                           UniteEnseignement ue) {
        return metier.updateUniteEnseignement(code, ue)
                ? Response.ok().build()
                : Response.status(404).build();
    }

    @DELETE
    @Path("/{code}")
    public Response delete(@PathParam("code") int code) {
        return metier.deleteUniteEnseignement(code)
                ? Response.ok().build()
                : Response.status(404).build();
    }
}