export default function ListPagos() {
    return (
        <List component="nav" aria-label="contacts">
          {pagos?.forEach((element) => {
        
              <ListItem button>
                <ListItemText primary={element} />
              </ListItem>
            
          })}
        </List>
      );
} 