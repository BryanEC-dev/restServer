
const { Router } = require('express');
const { check } = require('express-validator');
const {validateFields} = require('../middlewares/validate-fields')
const {isValidRol, checkEmail, existsId} = require('../helpers/db-validators')



const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',
            [
                check("id","el id no es valido").isMongoId(),
                check("id").custom(existsId),
                validateFields
            ] 

        ,usuariosPut );

router.post('/',
[
    check('name',"El nombre es obligatorio").not().isEmpty(),
    check('password',"El password debe ser de al menos 6 letras ").isLength({min:6}),
    check('email',"El correo no es válido").isEmail(),
    check('email').custom((email) => checkEmail(email)),
    // si el valor que pasa es solo uno y tiene el mismo nombre del parámetro se puede omitir
    // (rol) => esRolValido(rol) y solo llamar a la función esRolValido
    check('rol').custom( (rol) => isValidRol(rol) ),
    validateFields
],
 usuariosPost );

router.delete('/:id',
    [
        check("id","el id no es valido").isMongoId(),
        check("id").custom(existsId),
        validateFields
], usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;