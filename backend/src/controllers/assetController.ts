import { Request, Response } from 'express';
import { z } from 'zod';
import asyncHandler from 'express-async-handler';
import { supabase } from '../utils/supabase.js';
import { createError } from '../utils/error.js';

const assetSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.enum(['property', 'vehicle', 'investment', 'other']),
  value: z.number().positive('Value must be positive'),
  description: z.string().optional(),
  acquisitionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
});

export const createAsset = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = assetSchema.parse(req.body);

  const { data, error } = await supabase
    .from('assets')
    .insert({
      user_id: req.user!.id,
      name: validatedData.name,
      type: validatedData.type,
      value: validatedData.value,
      description: validatedData.description,
      acquisition_date: validatedData.acquisitionDate
    })
    .select()
    .single();

  if (error) {
    throw createError(400, error.message);
  }

  res.status(201).json(data);
});

export const getAssets = asyncHandler(async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', req.user!.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw createError(400, error.message);
  }

  res.json(data);
});

export const getAssetById = asyncHandler(async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id)
    .single();

  if (error) {
    throw createError(404, 'Asset not found');
  }

  res.json(data);
});

export const updateAsset = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = assetSchema.parse(req.body);

  const { data, error } = await supabase
    .from('assets')
    .update({
      name: validatedData.name,
      type: validatedData.type,
      value: validatedData.value,
      description: validatedData.description,
      acquisition_date: validatedData.acquisitionDate
    })
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id)
    .select()
    .single();

  if (error) {
    throw createError(400, error.message);
  }

  res.json(data);
});

export const deleteAsset = asyncHandler(async (req: Request, res: Response) => {
  const { error } = await supabase
    .from('assets')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user!.id);

  if (error) {
    throw createError(400, error.message);
  }

  res.status(204).send();
});