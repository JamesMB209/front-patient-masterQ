import io from 'socket.io-client';
const token = localStorage.getItem("token");
// const address = token.slice(-10)

/** Set up listners here */
export const UPDATE_PATIENT = "UPDATE_PATIENT";
// export const UPDATE_ME = address;
// console.log(address)

const messageTypes = [UPDATE_PATIENT].reduce( ( accum, msg ) =>     
  {
    accum[ msg ] = msg;
    return accum;
  }, {}
);


export const socket = io( process.env.REACT_APP_API_SERVER, {
        transports: ['websocket'],
        query: { token }
      });

export const init = ( store ) => {  Object.keys( messageTypes ).forEach( type => socket.on( type, ( payload ) => 
       store.dispatch({ type, payload }) 
    )
  );
};

export const emit = ( type, payload ) => socket.emit( type, payload );

