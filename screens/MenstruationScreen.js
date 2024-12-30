import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { auth, database } from '../config/firebase';
import { ref, set, get } from 'firebase/database';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const theme = {
  colors: {
    primary: '#6B48FF',
    secondary: '#FF6B6B',
    background: '#F7F7FF',
    text: '#2D3436',
    period: '#FFD1DC', // Light pink for period days
    fertile: '#98FB98', // Light green for fertile days
  }
};

const moodOptions = [
  { label: 'Very Happy', value: 5, icon: '😊' },
  { label: 'Happy', value: 4, icon: '🙂' },
  { label: 'Neutral', value: 3, icon: '😐' },
  { label: 'Sad', value: 2, icon: '😔' },
  { label: 'Very Sad', value: 1, icon: '😢' },
];

export default function MenstruationScreen() {
  const [selectedDates, setSelectedDates] = useState({});
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [moodData, setMoodData] = useState({});
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showClearDataModal, setShowClearDataModal] = useState(false);

  const userId = auth.currentUser?.uid;

  useEffect(() => {
    loadPeriodDates();
  }, []);

  const savePeriodDates = async (dates, mood = null) => {
    if (!userId) return;
    
    try {
      const dataToSave = {
        dates,
        cycleLength,
        periodLength,
        lastUpdated: new Date().toISOString(),
        moodData: mood ? { ...moodData, [selectedDate]: mood } : moodData
      };

      await set(ref(database, `period_tracking/${userId}`), dataToSave);
      if (mood) {
        setMoodData(dataToSave.moodData);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save data');
      console.error(error);
    }
  };

  const loadPeriodDates = async () => {
    if (!userId) return;

    try {
      const snapshot = await get(ref(database, `period_tracking/${userId}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setSelectedDates(data.dates || {});
        setCycleLength(data.cycleLength || 28);
        setPeriodLength(data.periodLength || 5);
        setMoodData(data.moodData || {});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generateMarkedDates = () => {
    const markedDates = { ...selectedDates };
    const dates = Object.keys(selectedDates).sort();
    
    dates.forEach(date => {
      // Mark period days
      for (let i = 0; i < periodLength; i++) {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + i);
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = {
          selected: true,
          marked: true,
          dotColor: theme.colors.secondary,
          selectedColor: theme.colors.period
        };
      }

      // Mark predicted next periods
      for (let i = 1; i <= 3; i++) {
        const nextPeriodStart = new Date(date);
        nextPeriodStart.setDate(nextPeriodStart.getDate() + (cycleLength * i));
        
        for (let j = 0; j < periodLength; j++) {
          const predictedDate = new Date(nextPeriodStart);
          predictedDate.setDate(predictedDate.getDate() + j);
          const dateString = predictedDate.toISOString().split('T')[0];
          markedDates[dateString] = {
            selected: true,
            marked: true,
            dotColor: 'transparent',
            selectedColor: theme.colors.period + '80' // 50% opacity
          };
        }
      }
    });

    return markedDates;
  };

  const onDayPress = (day) => {
    const date = day.dateString;
    setSelectedDate(date);

    // Show a modal to choose between adding period start or mood
    Alert.alert(
      'Select Action',
      'What would you like to do?',
      [
        {
          text: 'Add Mood',
          onPress: () => setShowMoodModal(true)
        },
        {
          text: 'Mark Period Start',
          onPress: () => {
            const updatedDates = { ...selectedDates };
            updatedDates[date] = {
              selected: true,
              marked: true,
              dotColor: theme.colors.secondary,
              selectedColor: theme.colors.period
            };
            setSelectedDates(updatedDates);
            savePeriodDates(updatedDates);
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const handleMoodSelect = (mood) => {
    // Only update mood data without touching period dates
    const updatedMoodData = {
      ...moodData,
      [selectedDate]: mood
    };
    
    setMoodData(updatedMoodData);
    
    // Save the updated mood data
    const dataToSave = {
      dates: selectedDates, // Keep existing period dates unchanged
      cycleLength,
      periodLength,
      lastUpdated: new Date().toISOString(),
      moodData: updatedMoodData
    };

    // Save to Firebase
    set(ref(database, `period_tracking/${userId}`), dataToSave)
      .catch(error => {
        Alert.alert('Error', 'Failed to save mood data');
        console.error(error);
      });
    
    setShowMoodModal(false);
  };

  const renderMoodChart = () => {
    const dates = Object.keys(moodData).sort();
    const moodValues = dates.map(date => moodData[date]);
    
    if (dates.length === 0) return null;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Mood Tracking</Text>
        <LineChart
          data={{
            labels: dates.map(date => date.slice(-5)),
            datasets: [{
              data: moodValues
            }]
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(107, 72, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      </View>
    );
  };

  const clearAllData = async () => {
    if (!userId) return;
    
    try {
      await set(ref(database, `period_tracking/${userId}`), null);
      setSelectedDates({});
      setMoodData({});
      Alert.alert('Success', 'All period tracking data has been cleared');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear data');
      console.error(error);
    }
    setShowClearDataModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Period Tracking</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setShowClearDataModal(true)}
          >
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={generateMarkedDates()}
          onDayPress={onDayPress}
          theme={{
            selectedDayBackgroundColor: theme.colors.secondary,
            todayTextColor: theme.colors.primary,
            arrowColor: theme.colors.primary,
          }}
        />
      </View>

      {renderMoodChart()}

      <Modal
        visible={showMoodModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMoodModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How are you feeling today?</Text>
            {moodOptions.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={styles.moodOption}
                onPress={() => handleMoodSelect(mood.value)}
              >
                <Text style={styles.moodEmoji}>{mood.icon}</Text>
                <Text style={styles.moodLabel}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowMoodModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showClearDataModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowClearDataModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear All Data?</Text>
            <Text style={styles.modalText}>
              This will permanently delete all your period tracking and mood data. 
              This action cannot be undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => setShowClearDataModal(false)}
              >
                <Text style={styles.cancelModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.clearModalButton]}
                onPress={clearAllData}
              >
                <Text style={styles.clearModalButtonText}>Clear Data</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rest of your existing JSX */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  calendarContainer: {
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoContainer: {
    padding: 15,
  },
  nextPeriodCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  nextPeriodText: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  moodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  moodEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  moodLabel: {
    fontSize: 16,
    color: theme.colors.text,
  },
  cancelButton: {
    marginTop: 15,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: theme.colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
  headerActions: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  clearButton: {
    padding: 8,
  },
  modalText: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancelModalButton: {
    backgroundColor: '#f0f0f0',
  },
  clearModalButton: {
    backgroundColor: theme.colors.secondary,
  },
  cancelModalButtonText: {
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  clearModalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
}); 