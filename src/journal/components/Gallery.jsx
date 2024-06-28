import { ImageList, ImageListItem } from '@mui/material'

const Gallery = ({ images = [] }) => {

  return (
    <ImageList
      sx={{ width: '100%' }}
      variant='masonry'
      cols={4}
      gap={8}

    >
      {images.map((item, index) => (
        <ImageListItem key={index}>
          <img
            srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item}?w=248&fit=crop&auto=format`}
            alt={index}
            loading="lazy"
            className='animate__animated animate__fadeIn'
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

export default Gallery