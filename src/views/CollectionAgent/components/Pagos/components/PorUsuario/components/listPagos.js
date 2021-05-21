import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import {Fragment} from 'react';

export default function ListPagos({ pagos }) {
  return (
    <List component="nav" aria-label="contacts">
      {pagos?.map((element, i) => {
        
        return (
          <ListItem button>
            <ListItemText primary={
            <Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
               {`${element.id} - ${element.concepto} - ${element.fechaVencimiento} - ${element.importe} - ${element.estatus}`} 
              </Typography>
            </Fragment>
          }
            
            />
          </ListItem>
        );
        // Return the element. Also pass key
        //return <Answer key={answer} answer={answer} />;
      })}
    </List>
  );
}

// {
//   this.props.question.answers.map((answer, i) => {
//     console.log("Entered");
//     // Return the element. Also pass key
//     return <Answer key={answer} answer={answer} />;
//   });
// }
