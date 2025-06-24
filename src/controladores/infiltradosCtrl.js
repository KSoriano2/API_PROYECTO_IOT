import {conmysql} from '../bd.js'
export const obtenerInfiltrados=(req, res)=>{
    res.send('Lista de Infiltrados');
}

export const getInfiltrados=async(req,res)=>{
    try{
        const [result]= await conmysql.query('select * from infiltrados ')
        res.json({can:result.length, data:result})
    }catch(error){
        return res.status(500).json({message: "error en el servidor "})
    }
};

export const postInfiltrados = async (req, res) => {
  try {
    const { fecha_ingreso, hora_ingreso, foto } = req.body;

    if (!fecha_ingreso || !hora_ingreso || !foto) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const [result] = await conmysql.query(
      `INSERT INTO infiltrados (fecha_ingreso, hora_ingreso, foto) VALUES (?, ?, ?)`,
      [fecha_ingreso, hora_ingreso, foto]
    );

    res.send({
      id_infiltrado: result.insertId,
      message: 'Infiltrado registrado exitosamente'
    });
  } catch (error) {
    console.error('Error al insertar infiltrado:', error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const putInfiltrados = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_ingreso, hora_ingreso, foto } = req.body;

    if (!fecha_ingreso || !hora_ingreso || !foto) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const [result] = await conmysql.query(
      `UPDATE infiltrados SET fecha_ingreso = ?, hora_ingreso = ?, foto = ? WHERE id_infiltrado = ?`,
      [fecha_ingreso, hora_ingreso, foto, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Infiltrado no encontrado" });
    }

    res.send({ message: "Infiltrado actualizado correctamente" });
  } catch (error) {
    console.error('Error en updateInfiltrado:', error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const patchInfiltrados = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = [];
    const valores = [];

    if (req.body.fecha_ingreso) {
      campos.push("fecha_ingreso = ?");
      valores.push(req.body.fecha_ingreso);
    }
    if (req.body.hora_ingreso) {
      campos.push("hora_ingreso = ?");
      valores.push(req.body.hora_ingreso);
    }
    if (req.body.foto) {
      campos.push("foto = ?");
      valores.push(req.body.foto);
    }

    if (campos.length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    valores.push(id); // Para el WHERE

    const [result] = await conmysql.query(
      `UPDATE infiltrados SET ${campos.join(', ')} WHERE id_infiltrado = ?`,
      valores
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Infiltrado no encontrado" });
    }

    res.send({ message: "Infiltrado actualizado parcialmente" });
  } catch (error) {
    console.error('Error en patchInfiltrado:', error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const deleteInfiltrados = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await conmysql.query(
      `DELETE FROM infiltrados WHERE id_infiltrado = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Infiltrado no encontrado" });
    }

    res.send({ message: "Infiltrado eliminado correctamente" });
  } catch (error) {
    console.error('Error en deleteInfiltrado:', error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
