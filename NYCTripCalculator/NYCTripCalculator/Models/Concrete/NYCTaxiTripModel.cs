using NYCTaxiMeter.Models.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NYCTaxiMeter.Models.Concrete
{
    /// <summary>
    /// Concrete class representing a trip in an NYC taxi
    /// </summary>
    public class NYCTaxiTripModel : ITripModel
    {
        public Guid TripId { get; set; }
        public decimal NumberOfMinutesTraveledAboveThreshold { get; set; }
        public decimal NumberOfMilesTraveledBelowThreshold { get; set; }
        public DateTime StartTime { get; set; }
        public int NumberOfUnits { get; set; }

        public override string ToString()
        {
            return $" tripId: {this.TripId} Number Of Minutes Traveled Above Threshhold:{this.NumberOfMinutesTraveledAboveThreshold} Number Of Miles Traveled Below Threshold: {this.NumberOfMilesTraveledBelowThreshold} StartTime:{this.StartTime} NumberOfUnits {this.NumberOfUnits}";
        }
    }
}
