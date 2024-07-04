import jwt from 'jsonwebtoken';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import z from 'zod';
import { ethers } from 'ethers';
import env from '../../types/env';

const router = Router();
const prisma = new PrismaClient();

const loginSchema = z.object({
  address: z.string(),
  // signature: z.string(),
});

router.post('/login', async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success)
      return res.status(404).json({ error: 'invalid format' });
    // const { address, signature } = result.data;
    // console.log('Address: ', address);
    // console.log('Signature: ', signature);
    // const message = `Login with address: ${address}`;
    // const signerAddress = ethers.verifyMessage(message, signature);
    // if (signerAddress.toLowerCase() !== address.toLowerCase())
    //   throw new Error();
    const user = await prisma.seller.upsert({
      where: {
        address: result.data.address,
      },
      create: {
        address: result.data.address,
      },
      update: {},
    });
    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET);
    return res.json({ token });
  } catch (e) {
    return res.json({ message: 'Error occured' });
  }
});

router.get('/:address', async (req, res) => {
  const address = req.params.address;
  const seller = await prisma.seller.findUnique({
    where: {
      address: address.toLowerCase(),
    },
  });
  if (null) return res.status(401).json({ error: 'No such seller exists' });
  return res.json(seller);
});

const updateSellerSchema = z.object({
  name: z.string().optional(),
  place: z.string().optional(),
  phoneNumber: z.string().max(10).optional(),
});
router.put('/:address', async (req, res) => {
  const address = req.params.address;
  const result = updateSellerSchema.safeParse(req.body);
  if (!result.success) return res.status(404).json({ error: 'invalid format' });
  const seller = await prisma.seller.update({
    where: {
      address: address.toLowerCase(),
    },
    data: {
      phoneNumber: result.data.phoneNumber,
      place: result.data.place,
      name: result.data.name,
      accountCreated: true,
    },
  });
  return res.json(seller);
});

const productSchema = z.object({
  name: z.string(),
  brand: z.string(),
  type: z.string(),
});

router.post('/products', async (req, res) => {
  const result = productSchema.safeParse(req.body);
  if (!result.success) return res.status(404).json({ error: 'invalid format' });
  const product = await prisma.product.create({
    data: {
      name: result.data.name,
      brand: result.data.brand,
      type: result.data.type,
    },
  });
  return res.json(product);
});

router.get('/', async (req, res) => {
  const sellers = await prisma.seller.findMany({});
  return res.json(sellers);
});

router.get('/:address', async (req, res) => {
  const address = req.params.address;
  const products = await prisma.seller.findUnique({ where: { address } });
  return res.json(products);
});

router.get('/id/:id', async (req, res) => {
  const id = Number(req.params.id);
  const products = await prisma.seller.findUnique({ where: { id } });
  return res.json(products);
});

export default router;
