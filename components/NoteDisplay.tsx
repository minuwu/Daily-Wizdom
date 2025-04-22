import React, { useState, useEffect } from 'react';
import { FlatList, TextInput, Pressable, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Note {
  id: string;
  text: string;
}

export default function NoteDisplay() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>('');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('notes');
        if (storedNotes) setNotes(JSON.parse(storedNotes) as Note[]);
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };
    loadNotes();
  }, []);

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const addNote = () => {
    if (newNote.trim()) {
      const updatedNotes = [...notes, { id: Date.now().toString(), text: newNote }];
      saveNotes(updatedNotes);
      setNewNote('');
    }
  };

  const editNote = (id: string, newText: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    saveNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
  };

  const renderNote = ({ item }: { item: Note }) => (
    <Pressable className="flex-row items-center border-b border-gray-300 dark:border-gray-700">
      <TextInput
        className="flex-1 text-base px-2 dark:text-white"
        style={{ color: textColor }}
        value={item.text}
        onChangeText={(text) => editNote(item.id, text)}
      />
      <Pressable
        className="ml-2 bg-red-500 px-3 py-1 rounded-md"
        onPress={() => deleteNote(item.id)}
      >
        <Ionicons name="trash" size={20} color="white" />
      </Pressable>
    </Pressable>
  );

  return (
    <Pressable
      className="rounded-lg shadow-md"
      style={{ backgroundColor }}
    >
      <Text className="text-lg font-bold mb-4" style={{ color: textColor }}>
        Notes
      </Text>
      <Pressable className="flex-row items-center mb-4">
        <TextInput
          className="flex-1 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-base"
          style={{ color: textColor }}
          placeholder="Add a new note"
          placeholderTextColor={textColor}
          value={newNote}
          onChangeText={setNewNote}
        />
        <Pressable
          className="ml-2 bg-blue-500 px-3 py-1 rounded-md"
          onPress={addNote}
        >
          <Ionicons name="add" size={20} color="white" />
        </Pressable>
      </Pressable>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
      />
    </Pressable>
  );
}
