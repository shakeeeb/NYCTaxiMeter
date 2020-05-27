using NYCTaxiMeter.Helpers.Abstract;
using NYCTaxiMeter.Models.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NYCTaxi = NYCTaxiMeter.Helpers.Constants.NYCTaxiConstants;

namespace NYCTaxiMeter.Helpers.Concrete
{
    /// <summary>
    /// NYC Taxi Trip Calculator
    /// </summary>
    public class NYCTaxiTripCalculator : ITripCalculator<NYCTaxiTripModel>
    {
        /// <summary>
        /// Calculates a price given an NYCTaxiTripModel.
        /// </summary>
        /// <param name="model">The NYCTaxiTripModel.</param>
        /// <returns>the price as a decimal.</returns>
        public decimal CalculatePrice(NYCTaxiTripModel model)
        {
            // Unit fare (.35n) * (miles driven less than 6mph * 5)
            var priceBelowThreshold = NYCTaxi.UNIT_FARE * model.NumberOfUnits * model.NumberOfMilesTraveledBelowThreshold * NYCTaxi.BELOW_THRESHOLD_MULTIPLIER;

            // Time driven higher than 6mph * unit fare (.35n)
            var priceAboveThreshold = model.NumberOfMinutesTraveledAboveThreshold * NYCTaxi.UNIT_FARE * model.NumberOfUnits;

            // NYS tax surcharge + peak hour weekday surcharge
            var charges = NYCTaxi.STATE_TAX_SURCHARGE + NYCTaxi.ENTRY_COST;

            // If the trip's start time is between the weekday surcharge times, add the weekday surcharge 
            if (NYCTaxi.Weekdays.Contains(model.StartTime.DayOfWeek) && IsPeakTime(model.StartTime)) 
            {
                charges += NYCTaxi.WEEKDAY_PEAK_HOUR_SURCHARGE;
            }

            return priceAboveThreshold + priceBelowThreshold + charges;

            // Check if a given time is within peak hours.
            bool IsPeakTime(DateTime time) 
            {
                var peakStart = time.Date.AddHours(16); // 4 PM
                var peakEnd = time.Date.AddHours(20);// 8 PM

                return time > peakStart && time < peakEnd;
            }
        }
    }
}
