import React, { useState, useMemo } from 'react'

const CinemaSeatBooking = ({
  layout= {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 5,
  },
  seatTypes = {
    regular: {name: 'Regular', price: 150, rows: [0, 1, 2] },
    premium: {name: 'Premium', price: 250, rows: [3, 4, 5] },
    vip: {name: 'VIP', price: 350, rows: [6, 7] },

  },
  bookedSeats = [],
  currency = '$',
  onBookingComplete = () => {},
  title = 'Cinema Hall Booking',
  subtitle = 'Select your prefered sests',
}) => {
  const getSeatType = ( ) => {
    // to do
  };

  const initializeSeats = useMemo(() => {
    const seats = [];
    for (let row = 0; row < layout.rows; row++){
      const seatRow = [];
      const seatTypeInfo = getSeatType(row);

      for(let seat = 0; seat < layout.seatsPerRow; seat++){
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;

        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatTypeInfo?.type || "regular",
          price: seatTypeInfo?.price || 10,
          color: seatTypeInfo?.color || "blue",
          status: bookedSeats.includes(seatId) ? "booked" : "available",
          selected: false,  
        });
      }
      seats.push(seatRow);
    }
    return seats;
  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initializeSeats);

  const getSeatClassName = (seat) => {
    return "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 m-1 rounded-t border-2 cursor-pointer transition-all duration-200 flex justify-center items-center text-xs sm:text-sm font-bold border-blue-300 text-blue-800 bg-blue-200";
  };

  const renderSeatSection = (seatRow, startIndex, endIndex) => {
    return ( 
      <div className='flex'>
        {seatRow.slice(startIndex, endIndex).map((seat, index) => {
          return ( 
            <div 
              className={getSeatClassName(seat)} 
              key={seat.id}
              title={ `${seat.id} - ${
                getSeatType(seat.row)?.name || "Regular"
              } - ${currency}${seat.price} `}
            >
                {" "}
                {startIndex + index + 1}
            </div>
          );
        })}
      </div>
    )
  };

  return (
    <div className='w-full text-center'>
      {/* tiltle */}
      <div className=' mt-10 max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6' >
          <h1 className=' text-5xl font-extrabold'>{title}</h1>
          <p className='mt-6 text-center text-2xl'>{subtitle}</p>         
      </div>
    
      {/* Screen */}
      <div>
        <div className='mx-auto w-[90%] h-4 bg-gray-300 mt-10 mb-2 rounded-2xl shadow-inner'/>
          <p className='text-center'>SCREEN</p>    
      </div>

      {/* Seat Map */}
      <div className='mb-6 overflow-x-auto'>
        <div className='flex flex-col items-center min-w-max mt-20 '>
          {seats.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className='flex mt-3'>
                <span className='mt-2 h-8 w-8 text-center font-bold mr-4 text-white border-2 border-gray-500 bg-gray-800'>
                  {String.fromCharCode(65 + rowIndex)} 
                </span>

                {renderSeatSection(row, 0, layout.aislePosition)}

                {renderSeatSection(
                  row,
                  layout.aislePosition,
                  layout.setPerRow
                )}
              </div>
            );
          })}
        </div>
      </div>


      {/* Avalibility */}
      {/* Summary */}
      {/* Book button */}

    </div>
  )
}

export default CinemaSeatBooking
