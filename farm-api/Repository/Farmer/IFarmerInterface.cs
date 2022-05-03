using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Farmer
{
    public interface IFarmerInterface
    {
        Object Login(Model.Farmer user);
        Object GetProfile(int userId);
        Object GetUserType(int userTypeId);
        Object SaveProfile(Model.Farmer user);
        Object UpdateProfile(Model.Farmer user);
    }
}
