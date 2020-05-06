// import React from 'react';
// import { graphql, QueryRenderer} from 'react-relay';
// import environment from '../../environment';


// export const HomeQueryComponent = (props) => {
//   return (
//     <QueryRenderer
//       environment={environment}
//       query={graphql`
//                 query homeQuery {
//                   mostlikedSongs {    
//                     id,  
//                     title,    
//                     source, 
//                     image{ 
//                       low, 
//                       mid, 
//                       high 
//                     }, 
//                     artist{ 
//                       firstname, 
//                       lastname, 
//                       gender, 
//                       image{ 
//                         low 
//                       } 
//                     }    
//                   }    
//                 }    
//                 `}
//       variables={{}}
//       render={({ error, response }) => {
//         if (error) {
//           console.log('Error in grp', error)
//           return <div>Error!: error</div>;
//         }
//         if (!response) {
//           return <div>Loading...</div>;
//         }
//         return <props.component list={response} />;
//       }}
//     />
//   )
// }