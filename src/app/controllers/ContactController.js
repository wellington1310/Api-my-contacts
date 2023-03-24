const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(req, res) {
    // Listar todos os registros
    const { orderBy } = req.query;
    const contacts = await ContactRepository.findAll(orderBy);
    res.json(contacts);
  }

  async show(req, res) {
    // Obter um registro
    const { id } = req.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      // 404 : Not Found
      return res.status(404).json({ error: 'Use not found' });
    }
    res.json(contact);
  }

  async store(req, res) {
    // Criar novo registro
    const {
      name, email, phone, categoryName,
    } = req.body;

    if (!name) {
      return res.json({ error: 'Name is required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }
    const contact = await ContactRepository.create({
      name, email, phone, categoryName,
    });
    res.json(contact);
  }

  async update(req, res) {
    // Editar um registro

    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);
    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    // Deletar um registro
    const { id } = req.params;

    await ContactRepository.delete(id);

    // 204: No Content
    res.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
