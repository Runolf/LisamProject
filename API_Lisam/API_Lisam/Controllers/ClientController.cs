using API_Lisam.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API_Lisam.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ClientController : ApiController
    {
        private LisamContext Context = new LisamContext();

        
        public IList<Client> Get()
        {
            IList<Client> Clients = Context.Clients
                .Where(C => C.ClientId > 0)
                .Include(P => P.Projects)
                //.Where(C => C.IsActive != false)
                .ToList();
            return Clients;
        }
       
        public IHttpActionResult Get(int id)
        {
            Client C = Context.Clients.Find(id);
            
            if (C != null)
            {
                C = Context.Clients
                    .Include(E => E.Projects)
                    .Where(D => D.ClientId == id)
                    .First();
                return Ok(C);
            }
            else{
                return NotFound();
            }
            
        }

        public HttpResponseMessage Post([FromBody]Client C)
        {
            
            try
            {
                
                C.Address = C.ZipCode + ", " + C.City + ", " + C.Street;
                
                C.IsActive = true;
             
                Context.Clients.Add(C);
                Context.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, C);
                message.Headers.Location = new Uri(Request.RequestUri + C.ClientId.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }


        }

        public HttpResponseMessage Put(int Id, Client Modif)
        {
            try
            {
                Client client  = Context.Clients.Find(Id);
                
                client.Company_Name = (Modif.Company_Name != null)? Modif.Company_Name:client.Company_Name;
                client.City = (Modif.City != null)? Modif.City: client.City;
                client.Street = (Modif.Street != null)? Modif.Street: client.Street;
                client.ZipCode = (Modif.ZipCode != null)? Modif.ZipCode: client.ZipCode;
                client.Number = (Modif.Number != null)? Modif.Number: client.Number;
                client.Language = (Modif.Language != null)?Modif.Language:client.Language;
                client.Email = (Modif.Email != null)?Modif.Email:client.Email;
                client.Address = client.ZipCode + ", " + client.City + ", " + client.Street;
                client.Projects = (Modif.Projects != null) ? Modif.Projects : client.Projects;

                Context.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, client);
                message.Headers.Location = new Uri(Request.RequestUri + client.ClientId.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }

        }

        public IHttpActionResult Delete(int Id)
        {
            Client client = Context.Clients.Find(Id);
            if (client == null)
            {
                return NotFound();
            }
            client.IsActive = false;
            //Context.Clients.Remove(client);
            Context.SaveChanges();
            return Ok();
        }

    }
}
