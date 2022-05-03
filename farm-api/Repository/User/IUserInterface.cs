using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.User
{
    public interface IUserInterface
    {
        Object Login(Model.Users user);
        Object GetUser(int farmerId, int userId);
        Object GetUserType(int userTypeId);
        Object SaveUser(Model.Users user);
        Object UpdateUser(Model.Users user);
    }
}
