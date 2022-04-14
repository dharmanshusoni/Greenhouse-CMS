using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.User
{
    public interface IUserInterface
    {
        Object Login(Model.User user);
        Object GetProfile(int userId);
        Object SaveProfile(Model.User user);
        Object UpdateProfile(Model.User user);
    }
}
