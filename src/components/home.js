import Card from './context'

export default function Home(){
  return(
    <div className="container">
    <Card 
        bgcolor = "White"
        txtcolor = "black"
        header = "WELLCOME TO THE BANK"
        title = ""
        text = "For all your banking needs"
        body = {(<img src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_158673029_9707279704500119_78594.jpg" className="img-fluid" alt="Responsive image"/>)}
    />
    </div>
);
}