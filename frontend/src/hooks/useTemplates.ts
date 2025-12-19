import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { templatesService } from '../services/templatesService';
import { CreateTemplateDTO, UpdateTemplateDTO } from '../../../shared/types/template';

export const useTemplates = (filters?: {
  category?: string;
  meetingType?: string;
  isActive?: boolean;
}) => {
  return useQuery({
    queryKey: ['templates', filters],
    queryFn: () => templatesService.getTemplates(filters),
  });
};

export const useTemplate = (templateId: string) => {
  return useQuery({
    queryKey: ['template', templateId],
    queryFn: () => templatesService.getTemplateById(templateId),
    enabled: !!templateId,
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTemplateDTO) => templatesService.createTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
};

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTemplateDTO }) =>
      templatesService.updateTemplate(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
      queryClient.invalidateQueries({ queryKey: ['template', variables.id] });
    },
  });
};

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => templatesService.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
};
