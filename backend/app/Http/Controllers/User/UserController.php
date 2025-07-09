<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserTransactionResource;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function transactionHistory()
    {
        $transactions = auth()->user()->userTransactions()->orderBy('created_at', 'desc')->get();

        return UserTransactionResource::collection($transactions);
    }



    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string|in:CBE,Awash,BOA',
        ]);

        $user = $request->user();

        if ($request->amount > $user->wallet_balance) {
            return response()->json([
                'message' => 'Insufficient wallet balance.',
            ], 422);
        }

        DB::beginTransaction();

        try {
            $transaction = Transaction::create([
                'user_id' => $user->id,
                'currency' => 'ETB',
                'amount' => $request->amount,
                'status' => 'paid',
                'reference' => Str::uuid(),
                'payment_method' => $request->payment_method,
            ]);

            $user->wallet_balance -= $request->amount;
            $user->save();

            DB::commit();

            return new UserTransactionResource($transaction);


        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Failed to create transaction',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
