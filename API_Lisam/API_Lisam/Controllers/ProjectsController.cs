﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using API_Lisam.Models;
using Newtonsoft.Json;

namespace API_Lisam.Controllers
{

    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ProjectsController : ApiController
    {
        private LisamContext Context = new LisamContext();

        /*
          include ici sert à include l'objet client correspondant au projet dans le get
       */
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IList<Project> Get()
        { 
            IList<Project> Projects = Context.Projects
                .Include(p => p.Client)
                .Where(P => P.ProjectId > 0).ToList();
            return Projects;
        }   
        public IHttpActionResult Get(int id){
           
           Project P = Context.Projects.Find(id);
           

            if (P != null && P.SignatureDate != null)
            {
                P = Context.Projects
                  .Include(p => p.Client)
                  .Where(p => p.ProjectId == id)
                  .First();

                return Ok(P);
            }
            else
            {
                return NotFound();
            }

           
            
        }

        public HttpResponseMessage Post([FromBody]Project P)
        {
            try
            {
                //P.SignatureDate = new DateTime();
                Context.Projects.Add(P);

                //P.Client = ClientControl.Get(C.ClientId);
                
               
                Context.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, P);
                message.Headers.Location = new Uri(Request.RequestUri + P.ProjectId.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            

        }

        
        public HttpResponseMessage Put(int Id, Project Modif)
        {
            try
            {
                Project project = Context.Projects.Find(Id);

                project.ProjectLeader = (Modif.ProjectLeader != null) ?
                    Modif.ProjectLeader : project.ProjectLeader;

                project.ProjectNumber = (Modif.ProjectNumber != null) ?
                    Modif.ProjectNumber : project.ProjectNumber;

                project.SignatureDate = (Modif.SignatureDate != null) ?
                    Modif.SignatureDate : project.SignatureDate;

                project.Statut = (Modif.Statut != null) ?
                    Modif.Statut : project.Statut;

                project.ClientId = (Modif.ClientId != null) ?
                    Modif.ClientId : project.ClientId;

                Context.SaveChanges();

                var message = Request.CreateResponse(HttpStatusCode.Created, project);
                message.Headers.Location = new Uri(Request.RequestUri + project.ProjectId.ToString());
                return message;
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
            
        }

        public IHttpActionResult Delete(int Id)
        {
            Project project = Context.Projects.Find(Id);
            if (project == null)
            {
                return NotFound();
            }
            Context.Projects.Remove(project);
            Context.SaveChanges();
            return Ok();
        }
 
        public int GetidByProjectNumber(string ProjectNumber)
        {
            Project Project = Get()
                .Where(P => P.ProjectNumber == ProjectNumber)
                .ToList()
                .FirstOrDefault();
            return Project.ProjectId;
        }
    }
}