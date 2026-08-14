import React, { useState, useMemo } from 'react'

const CinemaSeatBooking = ({
  layout= {
    rows: 8,
    setPerRow: 12,
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

  return (
    <div className='w-full text-center'>
      {/* tiltle */}
      <div className=' mt-10 max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6' >
          <h1 className=' text-5xl font-extrabold'>{title}</h1>
          <p className='mt-6 text-center text-2xl'>{subtitle}</p>         
      </div>
    
      {/* Screen */}
      <div>
        <div className='mx-auto w-[60%] h-4 bg-gray-300 mt-10 mb-2 rounded-2xl shadow-inner'/>
          <p className='text-center'>SCREEN</p>    
      </div>

      {/* Seat Map */}
      <div className='mb-6 overflow-x-auto'>
        <div className='flex flex-col items-center min-w-max '>
          {seats.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className='flex'>
                <span className='w-8 text-center font-bold mr-4 text-white'>
                  {String.fromCharCode(65 + rowIndex)} 
                </span>
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
