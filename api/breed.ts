import type { Request, Response } from 'express';
import db, { getBreeds } from '../server/utils/db';

export default async function handler(
  req: Request,
  res: Response
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { breedName } = req.query;

    if (!breedName || typeof breedName !== 'string') {
      return res.status(400).json({ message: 'Breed name is required' });
    }

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[-\s]/g, '')
        .trim();

    const breeds = await getBreeds();
    const normBreedName = normalize(breedName);
    const breedInfo = breeds.find((breed) => {
      return (
        normalize(breed.id) === normBreedName ||
        normalize(breed.name) === normBreedName ||
        (breed.nameHi && normalize(breed.nameHi) === normBreedName)
      );
    });

    if (!breedInfo) {
      return res.status(404).json({ message: 'Breed not found' });
    }

    return res.status(200).json(breedInfo);
  } catch (error) {
    console.error('Breed error:', error);
    return res.status(500).json({ 
      message: 'Server error', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
