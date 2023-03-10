import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';


export default function BlogCard({ name, title, description, image, timing }) {

   return (
      <Card sx={{
         width: '40%',
         margin: 'auto',
         mt: 2,
         padding: 2,
         boxShadow: "5px 5px 10px grey",
         ":hover:": {
            boxShadow: "5px 5px 10px skyBlue",
         },
      }}>
         <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{name}</Avatar>}
            name={name}
            time={timing}
         />
         <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
         />
         <CardContent>
            <Typography variant="h6" color="text.secondary">
               Title : {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
               Description : {description}
            </Typography>
         </CardContent>
      </Card>
   );
}