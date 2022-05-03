using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Farmer
    {
        public int id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        public string Phone { get; set; }

    }

    public class UserType
    {
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
    }

    public class Users
    {
        public int User_Id { get; set; }
        public string User_First_Name { get; set; }
        public string User_Last_Name { get; set; }
        public string User_Email_Id { get; set; }
        public string Password { get; set; }
        public string User_Image { get; set; }
        public string User_Phone { get; set; }
        public int UserType_Id { get; set; }
        public int Farmer_Id { get; set; }
    }
}
