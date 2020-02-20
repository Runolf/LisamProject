using API_Lisam.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API_Lisam.Controllers
{
    public class ClientController : ApiController
    {
        
        private ProjectsController PController = new ProjectsController();
        private Project P = new Project();
        private LisamContext Context = new LisamContext();

        public IList<Client> Get()
        {
            IList<Client> Clients = Context.Clients.Where(C => C.ClientId > 0).ToList();
            Context.SaveChanges();
            return Clients;
        }
        public Client Get(int id)
        {
            Client C = Context.Clients.Find(id);
            Context.SaveChanges();
            return C;
        }

        public HttpResponseMessage Post([FromBody]Client C)
        {
            
            try
            {
                C.ProjectId =  PController.GetidByProjectNumber(P.ProjectNumber);
               
                C.Address = C.ZipCode + ", " + C.City + ", " + C.Street;
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
            Context.Clients.Remove(client);
            Context.SaveChanges();
            return Ok();
        }

    }
}
