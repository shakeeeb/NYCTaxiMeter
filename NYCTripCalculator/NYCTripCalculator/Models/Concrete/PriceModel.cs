using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NYCTripCalculator.Models.Concrete
{
    public class PriceModel
    {
        public decimal Price { get; set; }

        public Guid TripId { get; set; }

        public override string ToString()
        {
            return $"Price : {Price} TripId: {TripId}";
        }
    }
}
