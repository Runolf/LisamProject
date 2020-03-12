using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API_Lisam.Models
{
    public class Client: isActive
    {
        private string _address;

        public int ClientId { get; set; }
        public string Company_Name { get; set; }

        public string Street { get; set; }
        public string ZipCode { get; set; }
        public string City { get; set; }

        public string Address
        {
            get { return _address; }
            set { _address = Street + " " + ZipCode + " " + City; }
        }

        public string Email { get; set; }
        public string Number { get; set; }
        public string Language { get; set; }
        //public bool IsActive { get; set; }

        // test foreign key
        public IList<Project> Projects
        {
            get; set;
        }
    }
}