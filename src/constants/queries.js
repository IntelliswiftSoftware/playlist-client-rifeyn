export const newReleaseSongListQuery = `query{newReleaseSongs(pageNumber:1, pageSize: 4, userId:1 ){     
    id,   
    title,  
    isLiked
    source,  
    image{  
      low,  
      mid,  
      high  
     
    },  
     
    artist{  
      firstname,  
      lastname,  
      gender,  
      image{  
        low  
      }  
    }     
  } 
}`;

export const topChartQuery = `query{mostlikedSongs(userId:1){     
    id,   
    title,  
    isLiked
    source,  
    image{  
      low,  
      mid,  
      high  
     
    },  
     
    artist{  
      firstname,  
      lastname,  
      gender,  
      image{  
        low  
      }  
    }     
    }                  
} 
}`;

export const moodsQuery = `allmoods { 
    id 
    name 
    description   
    image{
      low
      mid
      high
      basepath
    } 
  }`;

  export const generQuery = `allGenres{ 
    id 
    name 
    description
    image{
      low
      mid
      high
      basepath
    }
  }`;
export const artistsQuery = `artists{
    id
    firstname
    lastname
    gender
    image{
      low
      mid
      high
      basepath
    }
  }`;

