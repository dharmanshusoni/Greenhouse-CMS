using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Application
{
    public interface IApplicationInterface
    {
        Object SaveApplication(Model.Application application);
        Object UpdateApplication(Model.Application application);
        Object GetApplicationDetail(int applicationId);
        Object GetApplicationType(int applicationTypeId);
    }
}
