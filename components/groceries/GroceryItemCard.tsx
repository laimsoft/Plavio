import { Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';

export type GroceryItemType = {
  id: string;
  name: string;
  note: string;
  quantity: string;
  rawQuantity?: string;
  unit?: string;
  categoryId?: number | null;
  category: string;
  checked: boolean;
};

type Props = {
  item: GroceryItemType;
  onToggle: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export default function GroceryItemCard({ item, onToggle, onEdit, onDelete }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const iconRef = useRef<View>(null);

  const handleMenuPress = () => {
    iconRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setMenuPos({ top: pageY, right: Dimensions.get('window').width - pageX - width });
      setMenuVisible(true);
    });
  };

  const handleEdit = () => {
    setMenuVisible(false);
    onEdit && onEdit(item.id);
  };

  const handleDelete = () => {
    setMenuVisible(false);
    onDelete && onDelete(item.id);
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => onToggle(item.id)}
    >
      <View
        style={[styles.checkbox, item.checked && styles.checkboxChecked]}
      >
        {item.checked && <Feather name="check" size={14} color="#FFF" />}
      </View>

      <View style={styles.iconContainer}>
        <Feather name="shopping-bag" size={20} color="#06B6D4" />
      </View>

      <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
        {item.name}
      </Text>

      <View style={styles.rightActions}>
        <View style={styles.quantityBadge}>
          <Text style={styles.quantityText}>{item.quantity || '1'}</Text>
        </View>
        <View ref={iconRef}>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Feather name="more-vertical" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={menuVisible} transparent={true} animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={[styles.dropdownContainer, { top: menuPos.top, right: menuPos.right }]}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleEdit}>
                <Feather name="edit-2" size={16} color="#475569" />
                <Text style={styles.dropdownItemText}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.dropdownDivider} />
              <TouchableOpacity style={styles.dropdownItem} onPress={handleDelete}>
                <Feather name="trash-2" size={16} color="#EF4444" />
                <Text style={[styles.dropdownItemText, { color: '#EF4444' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#67E8F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#A5F3FC',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#22D3EE',
    borderColor: '#22D3EE',
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#ECFEFF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#059669',
  },
  menuButton: {
    padding: 6,
  },
  modalOverlay: {
    flex: 1,
  },
  dropdownContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    paddingVertical: 4,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 12,
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#475569',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 8,
  },
});
