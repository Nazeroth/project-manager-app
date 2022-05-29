import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  TaskDto,
  UpdateTaskResponseDto,
} from '~/common/types/types';
import {
  ActionType,
  GetAllPayload,
  TaskCreatePayload,
  TaskIdPayload,
  TaskUpdatePayload,
} from './common';

export const createTask = createAsyncThunk<
  TaskDto,
  TaskCreatePayload,
  AsyncThunkConfig
>(
  ActionType.CREATE,
  async ({ boardId, columnId, createTaskDto }, { extra }) => {
    const { taskApi } = extra;
    const response = await taskApi.create(boardId, columnId, createTaskDto);
    return response;
  },
);

export const updateTask = createAsyncThunk<
  UpdateTaskResponseDto,
  TaskUpdatePayload,
  AsyncThunkConfig
>(
  ActionType.UPDATE,
  async ({ taskId, boardId, columnId, updateTaskResponseDto }, { extra }) => {
    const { taskApi } = extra;

    const response = await taskApi.update(
      boardId,
      columnId,
      taskId,
      updateTaskResponseDto,
    );
    console.log(response);
    return response;
  },
);

export const getAll = createAsyncThunk<
  Array<TaskDto>,
  GetAllPayload,
  AsyncThunkConfig
>(ActionType.GET_ALL, async ({ boardId, columnId }, { extra }) => {
  const { taskApi } = extra;
  const response = await taskApi.getAll(boardId, columnId);
  return response;
});

export const getById = createAsyncThunk<
  TaskDto,
  TaskIdPayload,
  AsyncThunkConfig
>(ActionType.GET_BY_ID, async ({ boardId, columnId, taskId }, { extra }) => {
  const { taskApi } = extra;
  const response = await taskApi.getById(boardId, columnId, taskId);
  return response;
});

export const removeTask = createAsyncThunk<
  void,
  TaskIdPayload,
  AsyncThunkConfig
>(ActionType.DELETE, async ({ boardId, columnId, taskId }, { extra }) => {
  const { taskApi } = extra;
  await taskApi.delete(boardId, columnId, taskId);
});
