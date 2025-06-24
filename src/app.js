app.use(cors(corsOptions));
app.use(express.json()); //interpretar los objetos json
app.use(express.urlencoded({extended:true})) //se añade para aceptar formularios
app.use('/uploads',express.static(path.join(__dirname,'../uploads')));

// indicar que rutas se utilizan


app.use('/api', authRoutes)  //IMPORTACION

app.use((req,resp,next)=>{
    resp.status(400).json({
        message:'Endponit noy fount'
    })
})
export default app;